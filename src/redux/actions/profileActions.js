import httpRequest from "../../config/axiosConfig";
import axios from "axios";
import { toast } from "react-toastify";

export const setProfile = () => async (dispatch) => {
  try {
    const option = {
      url: "user/me",
      method: "GET",
    };
    const res = await httpRequest(option);
    dispatch({ type: "SET_PROFILE", payload: res.data });
  } catch (e) {
    console.log(e);
  }
};

export const createPost = (data, setShowProgress) => async (
  dispatch
) => {
  try {
    const option = {
      baseURL: process.env.REACT_APP_API,
      method: "POST",
      url: "posts",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem(
          "access_token"
        )}`,
      },
    };
    const res = await axios(option);
    dispatch({
      type: "ADD_POST",
      payload: res.data.data.post,
    });
    setShowProgress(false);
  } catch (e) {
    console.log(e);
  }
};

export const setPublicProfileData = (userID) => async (
  dispatch
) => {
  try {
    const option = {
      url: `user/open/${userID}`,
      method: "GET",
    };
    const res = await httpRequest(option);
    dispatch({
      type: "SET_PUBLIC_PROFILE",
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateUserAction = (userData) => async (
  dispatch
) => {
  try {
    const option = {
      data: userData,
      url: "user/me",
      method: "PATCH",
    };
    const res = await httpRequest(option);
    console.log(res.data.user);
    dispatch({
      type: "SET_USER_UPDATE",
      payload: res.data.user,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateAvatarAction = (formData) => async (
  dispatch
) => {
  try {
    const option = {
      data: formData,
      url: "user/me/avatar",
      method: "POST",
    };
    const res = await httpRequest(option);
    console.log(res.data.avatar);
    dispatch({
      type: "SET_USER_AVATAR_UPDATE",
      payload: res.data.avatar,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const option = {
      baseURL: process.env.REACT_APP_API,
      url: `posts/${postId}`,
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem(
          "access_token"
        )}`,
      },
    };
    const res = await axios(option);
    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });

    toast.info("Post Deleted.");
  } catch (e) {
    console.log(e);
  }
};
