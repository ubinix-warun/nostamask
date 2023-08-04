
import { create as ipfsHttpClient } from "ipfs-http-client";
import type { FilesWithId, ImagesPreview } from '@lib/types/file';

const authorization = "Basic " + 
  btoa(process.env.NEXT_PUBLIC_INFURA_API_KEY + ":" + process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET);

export async function uploadImages(
    userId: string,
    files: FilesWithId
  ): Promise<ImagesPreview | null> {
    if (!files.length) return null;

    const ipfs = ipfsHttpClient({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });

    const imagesPreview = await Promise.all(
      files.map(async (file) => {
        let src: string;
  
        const { id, name: alt } = file;
  
        const result = await ipfs.add(file);

        src =  `https://nostamask.infura-ipfs.io/ipfs/${result.path}`

    //     const storageRef = ref(storage, `images/${userId}/${alt}`);
    //     try {
    //       src = await getDownloadURL(storageRef);
    //     } catch {
    //       await uploadBytesResumable(storageRef, file);
    //       src = await getDownloadURL(storageRef);
    //     }

        // ----------------------------------------------------
        // INFURA IPFS API (REQ FS - USE IPFS HTTP CLIENT) ----
        // ----------------------------------------------------
        // const storeImageFile = await sdk.storeFile(
        //     "./integration-test/ipfs-test/metamask.jpeg",
        //   );
        // console.log("storeImageUrl ----", storeImageFile);
        // ----------------------------------------------------
        // https://docs.infura.io/infura-expansion-apis/nft-api/nft-sdk/javascript-api/ipfs-methods
        // ----------------------------------------------------
  
        return { id, src, alt };
      })
    );
  
    return imagesPreview;
  }
  
