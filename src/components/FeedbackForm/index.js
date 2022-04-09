import React, { useState } from "react";
import styled from "@emotion/styled";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Button, IconButton } from '@mui/material';
import ContributeIcon from "@site/static/img/git_contribute.svg";
import useWindowSize from "../../hooks/useWindowSize";
import { sendFeedback } from "@site/src/api/feedback";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import AdjustIcon from '@mui/icons-material/Adjust';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import useBaseUrl from '@docusaurus/useBaseUrl'
import { Link } from 'react-router-dom';

const FormHeaderTitle = styled("div")(() => ({
  fontSize: "18px;",
  fontWeight: 100,
  marginBottom: "5px",
  opacity: 0.4
}));

const FormDivContainer = styled("div")(() => ({
  // marginLeft: "10px",
  // marginRight: "50px",
  // width: "320px",
  // minWidth: "320px",
  fontWeight: "bold",
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
    description: "",
    like: false,
    unlike: false
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
      like: !formData.like,
      unlike: false
    });
  }
  const handleUnLike = (e) => {
    setFormData({
      ...formData,
      unlike: !formData.unlike,
      like: false
    });
  }
  const validation = () => {
    if(!formData.description)  {
      return {
        success: false,
        msg: 'Please fill out all required fields 😥'
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
        await sendFeedback(formData.description, Number(formData.like));
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
      description: "",
      like: false,
      unlike: false,
    });
  }

  const Contribute = (
    <FormDivContainer  style={{float: "right"}}>
      <FormHeaderTitle style={{ marginTop: "10px", direction: 'rtl'}}>
        Can't wait to see you on
      </FormHeaderTitle>
      <Label style={{ direction: 'rtl'}}>
        <Button className="icon-button" color="primary">
          <a href="https://github.com/singularity-data">
            <img className="icon-button-img" src={useBaseUrl("/img/home/github.png")}/>
          </a>
        </Button>
        <Button className="icon-button" color="primary">
          <a href="https://twitter.com/SingularityData">
            <img className="icon-button-img" src={useBaseUrl("/img/home/twitter.png")}/>
          </a>
        </Button>
        <Button className="icon-button" color="primary">
          <a href="https://join.slack.com/t/risingwave-community/shared_invite/zt-120rft0mr-d8uGk3d~NZiZAQWPnElOfw">
            <img className="icon-button-img" src={useBaseUrl("/img/home/slack.png")}/>
          </a>
        </Button>
      </Label>
    </FormDivContainer>
  );

  if (status) {
    return (
      <div style={{
        width: "100%", 
        marginTop: "15px",
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
        style={{
          width: "100%",
          marginTop: "15px",
          border: "solid 1px rgb(235, 232, 232)"
        }}
      >
        <FormDivContainer style={{float: "left", marginTop: "10px"}}>
          <FormHeaderTitle>Was the doc helpful?</FormHeaderTitle>
          <Button variant={formData.like ? "contained" : "outlined"} color="primary" style={{ marginRight: "5px" }} onClick={handleLike}>
            <ThumbUpOffAltIcon />
          </Button>
          <Button variant={formData.unlike ? "contained" : "outlined"} color="primary" onClick={handleUnLike}>
            <ThumbDownOffAltIcon />
          </Button>
          <div style={{ width: "320px"}}>
            {formData.like? (<>
              <Label className="inputLabel">Share your thoughts about using RisingWave with us.<LabelOptional>Optional</LabelOptional></Label>
            </>): ""} 
            {formData.unlike? (<>
              <Label><span className="inputLabel">Got feedback? We'd love to hear it.</span>
                <LabelOptional>Optional</LabelOptional>
              </Label>
            </>): ""}

            {(formData.like || formData.unlike)? (<div style={{height: "170px"}}>
              <textarea value={formData.description} onChange={handleChange} placeholder="" name="description" required cols={38} rows={5} style={{ borderRadius: "5px", padding: "10px" }} />
              <Label><span style={{ opacity: "0.5" }}></span>
              </Label>
              <Button variant="outlined" style={{ float: "right", fontWeight: "bold" }} onClick={handleSubmit}>
                Send
              </Button>
              <Button color="primary" style={{ float: "right", marginRight: "25px", fontWeight: "bold" }} onClick={handleCancel}>
                Cancel
              </Button>
            </div>): ""}
          </div>
          <FormHeaderTitle style={{ marginTop: "17px" }}>Help us make this doc better!</FormHeaderTitle>
          <Button variant="outlined" className="ajustButton" onClick={() => window.open("https://github.com/singularity-data/risingwave-docs/issues/new")}>
            <AdjustIcon className="buttonIcon"/>File an issue
          </Button>
          <Button variant="outlined" className="contributeButton" onClick={() => window.open(props.editUrl)}>
            <ContributeIcon className="buttonIcon"/>Edit this page
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