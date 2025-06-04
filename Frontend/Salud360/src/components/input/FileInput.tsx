import { File as FileIcon, UploadCloud } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";

const FileInput = ({
  name,
  details = "SVG, PNG, JPG or GIF (MAX. 800x400px)",
  accept = "",
  multiple = false,
}: {
  name: string;
  details?: string;
  accept?: string;
  multiple?: boolean;
}) => {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const dragCounter = useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    if (!fileInputRef.current) return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(files[0]);

    if (fileInputRef.current.files)
      Array.from(fileInputRef.current.files).forEach((file) => {
        dataTransfer.items.add(file);
      });

    fileInputRef.current.files = dataTransfer.files;

    setFiles(Array.from(fileInputRef.current.files));
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <label
        htmlFor={id}
        data-is-dragging={isDragging}
        className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 data-[is-dragging=true]:bg-blue-500 data-[is-dragging=true]:border-blue-900 group"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud
            className="text-gray-500 group-data-[is-dragging=true]:text-white"
            size={48}
          />
          {!isDragging ? (
            <>
              <p className="mb-2 text-sm text-gray-500 group-data-[is-dragging=true]:text-white">
                <span className="font-semibold">Haz click para subir</span> ó
                arrastra y suelta
              </p>
              <p className="text-xs text-gray-500 group-data-[is-dragging=true]:text-white">
                {details}
              </p>
            </>
          ) : (
            <>
              <span>Arrastrando</span>
            </>
          )}
        </div>
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          className="hidden"
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={() => {
            if (!fileInputRef.current || !fileInputRef.current.files) return;
            setFiles(Array.from(fileInputRef.current.files));
          }}
        />
      </label>
      {files.length !== 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {files.map((file, index) => (
            <div key={index} className="flex gap-2">
              <div>
                <FileIcon size={36} />{" "}
                <span className="text-label-large">{file.type}</span>
              </div>
              <p>
                <span className="text-label-large">Nombre: {file.name}</span>
                <br />
                <span className="text-label-large">Tamaño: {file.size} b</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInput;
