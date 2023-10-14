import React from "react";
import { Button, Modal, Progress } from "antd";
import "./FileUpload.css";

interface FileUploadModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    uploadImage: () => void;
    currentImage: any;
    progress: number;
  }
  
export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}: FileUploadModalProps) {
  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage.name}</p>
          <label className="upload-btn" htmlFor="image-upload">
            Add an Image
          </label>
          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input hidden id="image-upload" type={"file"} onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
}