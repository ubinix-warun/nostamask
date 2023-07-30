
import type { FilesWithId, ImagesPreview } from '@lib/types/file';

export async function uploadImages(
    userId: string,
    files: FilesWithId
  ): Promise<ImagesPreview | null> {
    if (!files.length) return null;

    const imagesPreview = await Promise.all(
      files.map(async (file) => {
        let src: string;
  
        const { id, name: alt } = file;
  
        // INFURA IPFS API ------------------------------------
        // const storeImageFile = await sdk.storeFile(
        //     "./integration-test/ipfs-test/metamask.jpeg",
        //   );
        // console.log("storeImageUrl ----", storeImageFile);
        // ----------------------------------------------------
        // https://docs.infura.io/infura-expansion-apis/nft-api/nft-sdk/javascript-api/ipfs-methods
        // ----------------------------------------------------


    //     const storageRef = ref(storage, `images/${userId}/${alt}`);
    //     try {
    //       src = await getDownloadURL(storageRef);
    //     } catch {
    //       await uploadBytesResumable(storageRef, file);
    //       src = await getDownloadURL(storageRef);
    //     }

        src = ""
  
        return { id, src, alt };
      })
    );
  
    return imagesPreview;
  }
  