import crypto from "crypto";
import Login from "./Login";
import { Client, Environment } from "square";
import Main from "./Main";

function getCodeVerifier() {
  const codeVerifier = crypto
    .randomBytes(46)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const codeChallenge = base64UrlEncode(
    crypto.createHash("sha256").update(codeVerifier).digest()
  );

  function base64UrlEncode(str) {
    const base64 = Buffer.from(str).toString("base64");
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
  return [codeVerifier, codeChallenge];
}

const getImage = async (items, client) => {
  const images = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const imageIds = item.itemData.imageIds;
    if (imageIds) {
      try {
        const response = await client.catalogApi.batchRetrieveCatalogObjects({
          objectIds: imageIds,
        });
        images[item.id] = response.result.objects[0].imageData.url;
      } catch (error) {
        console.log(error);
      }
    }
  }
  return images;
};

const getUserData = async (accessToken) => {
  const data = {
    merchantsInfo: [],
    catalog: {},
    images: {},
  };

  const client = new Client({
    environment:
      process.env.ENVIRONMENT === "production"
        ? Environment.Production
        : Environment.Sandbox,
    accessToken: accessToken,
  });

  try {
    const response = await client.merchantsApi.listMerchants();
    data.merchantsInfo = response.result.merchant;
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await client.catalogApi.listCatalog();
    data.catalog = response.result;
    data.images = await getImage(response.result.objects, client);
  } catch (error) {
    console.log(error);
  }
  return data;
};

const getAccessToken = async (authorizationCode, codeVerifier) => {
  const client = new Client({
    environment:
      process.env.ENVIRONMENT === "production"
        ? Environment.Production
        : Environment.Sandbox,
    accessToken: process.env.SECRET,
  });
  try {
    const response = await client.oAuthApi.obtainToken({
      clientId: process.env.CLIENT_ID,
      grantType: "authorization_code",
      code: authorizationCode,
      codeVerifier: codeVerifier,
      redirectUri: process.env.REDIRECT_URI,
    });
    return response.result.accessToken;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default async function Home(searchParams) {
  const [codeVerifier, codeChallenge] = getCodeVerifier();
  const merchantsInfo = [];
  let catalog = {};
  let images = {};
  let loginUrl =
    process.env.ENVIRONMENT === "production"
      ? "https://connect.squareup.com/oauth2/authorize"
      : "https://squareupsandbox.com/oauth2/authorize";

  const getShowLogin = async () => {
    const authorizationCode = searchParams.searchParams.code;
    const codeVerifier = searchParams.searchParams.codeVerifier;
    if (authorizationCode && codeVerifier) {
      try {
        const accessToken = await getAccessToken(
          authorizationCode,
          codeVerifier
        );
        const userData = await getUserData(accessToken);
        merchantsInfo.push(userData.merchantsInfo);
        catalog = userData.catalog;
        images = userData.images;
        return false;
      } catch (error) {
        console.log(error);
        loginUrl += `?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&session=false&response_type=code&scope=MERCHANT_PROFILE_READ+ITEMS_READ&code_challenge=${codeChallenge}`;
        return true;
      }
    } else {
      loginUrl += `?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&session=false&response_type=code&scope=MERCHANT_PROFILE_READ+ITEMS_READ&code_challenge=${codeChallenge}`;
      return true;
    }
  };

  const showLogin = await getShowLogin();

  return (
    <div>
      {showLogin ? (
        <Login link={loginUrl} codeVerifier={codeVerifier} />
      ) : (
        <Main merchantsInfo={merchantsInfo} catalog={catalog} images={images} />
      )}
    </div>
  );
}
