// import { api } from "../api";

// export default async function authVerify(){
//     const res = await api.post("/auth/verify")
//     return res.data
// }

import { api } from "../api";

 export type VerifyDocumentParams = {
  documentType: string;
  documentNumber: string;
  remarks?: string;
  documentFile: {
    uri: string;
    name: string;
    type: string;
  };
  documentSelfieFile?: {
    uri: string;
    name: string;
    type: string;
  };
};

export default async function authVerify(data: VerifyDocumentParams) {
  try {
    const formData = new FormData();

    formData.append("documentType", data.documentType);
    formData.append("documentNumber", data.documentNumber);

    if (data.remarks) {
      formData.append("remarks", data.remarks);
    }

    formData.append("documentFile", {
      uri: data.documentFile.uri,
      name: data.documentFile.name,
      type: data.documentFile.type,
    } as any);

    if (data.documentSelfieFile) {
      formData.append("documentSelfieFile", {
        uri: data.documentSelfieFile.uri,
        name: data.documentSelfieFile.name,
        type: data.documentSelfieFile.type,
      } as any);
    }

    const res = await api.post("/auth/verify", formData, {
      headers: {
    // Authorization: `Bearer ${}`,
  },
    });

    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      throw error.response.data;
    } else {
      console.error("Unexpected error:", error.message);
      throw error;
    }
  }
}
