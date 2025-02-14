import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller } from "react-hook-form";

type TProps = {
  name: string;
};

const CRTextEditor = ({ name }: TProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "code"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div>
      <Controller
        name={name}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <ReactQuill
            className="h-[130px] lg:h-[160px]"
            placeholder="Write the overview"
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
            modules={modules}
          />
        )}
      />
    </div>
  );
};

export default CRTextEditor;
