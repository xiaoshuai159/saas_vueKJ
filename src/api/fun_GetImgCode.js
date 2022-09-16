export const fun_GetImgCode = (url, params) => {
    return axios({
      url: `${url}`,
      responseType: "arraybuffer", // 类型
      method: "get",
      params
    });
  };
