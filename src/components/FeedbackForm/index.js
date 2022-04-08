import React, { useState } from "react";
import styled from "@emotion/styled";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Button } from '@mui/material';
import ContributeIcon from "@site/static/img/git_contribute.svg";
import useWindowSize from "../../hooks/useWindowSize";
import { sendFeedback } from "@site/src/api/feedback";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"

const FormHeaderTitle = styled("div")(() => ({
  fontSize: "18px;",
  fontWeight: "bold",
  marginBottom: "15px",
}));

const FormDivContainer = styled("div")(() => ({
  marginLeft: "10px",
  marginRight: "50px",
  width: "320px",
  minWidth: "320px",
  fontWeight: "bold",
  height: "430px",
  float: "left",
  marginBottom: "40px"
}));

const Label = styled("div")(() => ({
  marginTop: "10px",
  marginBottom: "5px",
  fontSize: "16px;"
}));

const LabelOptional = styled("span")(() => ({
  opacity: 0.5,
  fontSize: "15px;",
  float: "right"
}));

const FeedbackForm = (props) => {
  const size = useWindowSize();
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    description: "",
    like: true
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleLike = (e) => {
    setFormData({
      ...formData,
      like: !formData.like
    });
  }
  const validation = () => {
    if(!formData.email)  {
      return {
        success: false,
        msg: 'Please fill out all required fields 😥'
      };
    }  

    if(!formData.description)  {
      return {
        success: false,
        msg: 'Please fill out all required fields 😥'
      };
    }  

    let reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!reg.test(formData.email)) {
      return {
        success: false,
        msg: 'Invalid Email Form 😥'
      };
    }

    return {
      success: true
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = validation();
      if(valid.success) {
        await sendFeedback(formData.email, formData.description, Number(formData.like));
        setStatus("We'll be in touch soon.")
      }
      else {
        toast.error(valid.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      toast.error('Someting went wrong 😥', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setStatus(err.toString());
    };
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setStatus("");
    setFormData({
      email: "",
      description: "",
      like: true
    });
  }

  const Contribute = (
    <FormDivContainer>
      <FormHeaderTitle>Help us make these docs great!</FormHeaderTitle>
      <Label>
        All GitHub docs are open source. See something that's wrong or unclear? 
        Submit a pull request.
      </Label>
      <Button variant="outlined" className="contributeButton" onClick={() => window.open(props.editUrl)}>
        <ContributeIcon className="buttonIcon"/>Make a contribution
      </Button>
      <Label>
        Or, <a style={{}} href="https://github.com/github/docs/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">
          learn how to contribute.
        </a>
      </Label>
      <FormHeaderTitle style={{marginTop: "70px"}}>
        Still need help?
      </FormHeaderTitle>
      <Label>
        <a style={{}} href="https://github.com/github/docs/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">
          Ask the Gihub Commnuity
        </a>
      </Label>
    </FormDivContainer>
  );

  if (status) {
    return (
      <div style={{
        width: "100%", 
        marginTop: "15px",
        display: size.width >= 768? "flex": "block"
      }}>
        <FormDivContainer>
          <div className="text-2xl">Thank you!</div>
          <div className="text-md">{status}</div>
        </FormDivContainer>
        {Contribute}
      </div>
    );
  }
  return (
    <>
      <form
        action={FORM_ENDPOINT}
        method="POST"
        target="_blank"
        style={{
          width: "100%",
          marginTop: "15px",
          display: size.width >= 768 ? "flex" : "block"
        }}
      >
        <FormDivContainer>
          <FormHeaderTitle>Did this doc help you?</FormHeaderTitle>
          <Button variant={formData.like ? "contained" : "outlined"} color="primary" style={{ marginRight: "5px" }} onClick={handleLike}>
            <ThumbUpOffAltIcon />
          </Button>
          <Button variant={!formData.like ? "contained" : "outlined"} onClick={handleLike}>
            <ThumbDownOffAltIcon />
          </Button>
          <Label>Let us know what we do well.<LabelOptional>Optional</LabelOptional></Label>
          <textarea value={formData.description} onChange={handleChange} placeholder="" name="description" required cols={38} rows={5} style={{ borderRadius: "5px", padding: "10px" }} />
          <Label><span>If we can contact you with more questions, please enter your email address.</span>
            <LabelOptional>Optional</LabelOptional>
          </Label>
          <input value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" name="email" required style={{ width: "320px", borderRadius: "5px", padding: "10px" }} />
          <Label><span style={{ opacity: "0.5" }}>If you need a reply, please contact support instead.</span>
          </Label>
          <Button variant="outlined" style={{ float: "right", fontWeight: "bold" }} onClick={handleSubmit}>
            Send
          </Button>
          <Button color="primary" style={{ float: "right", marginRight: "25px", fontWeight: "bold" }}>
            Cancel
          </Button>
        </FormDivContainer>
        {Contribute}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </>

  );
};

export default FeedbackForm;