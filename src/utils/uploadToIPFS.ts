const convertB64ToFile = (b64image: string): File => {
  const imageContent = atob(b64image);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  const type = "image/png";
  const blob = new Blob([buffer], { type });
  return new File([blob], "temp.png", {
    lastModified: new Date().getTime(),
    type,
  });
};

export const uploadToIPFS = async (b64image: string): Promise<string> => {
  try {
    const JWT = `Bearer ${import.meta.env.VITE_PINATA_JWT}`;
    const formData = new FormData();

    const file = convertB64ToFile(b64image);
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: "file name",
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    const data = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT,
      },
      body: formData,
    });

    if (!data.ok) {
      throw new Error("Something went wrong");
    }

    const json = await data.json();
    return json.IpfsHash;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
