import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";

function DropImage(){
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('Archivo cargado:', acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': [] }});

    return(
        <div {...getRootProps()} className="w-full h-48 border-dashed border-2 border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer text-gray-500">
            <input {...getInputProps()} />
            {isDragActive ? (<p>Suelta la imagen aquí...</p>) 
            : 
            (<><p>📎 Arrastra una imagen aquí o haz clic para buscar</p>
                <span className="text-sm text-gray-400">Formatos: JPG, PNG, etc.</span>
                </>
            )}
        </div>
    );

}

export default DropImage;