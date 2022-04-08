import Api from "./api";

export async function sendFeedback(email, description, like){
  await Api.post("/feedbacks", {
    email: email,
    description: description,
    like: like
  })
}