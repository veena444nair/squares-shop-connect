import { ClipLoader } from "react-spinners";

export default function Loading() {
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="flex justify-center items-center h-screen absolute top-0 left-0 w-full bg-black bg-opacity-50">
      <div className="border-t-4 border-b-4 border-green-500 rounded-full h-16 w-16 animate-spin">
        <ClipLoader color={"#36D7B7"} loading={true} css={override} size={50} />
      </div>
    </div>
  );
}
