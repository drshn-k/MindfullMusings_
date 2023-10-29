import "./BlogPage.css";
import email_icon from "../assets/email.png";
import user_icon from "../assets/person.png";

const BlogPage = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Enter Your Blog</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Title" />
        </div>

        <div className="input ">
          <img src={email_icon} alt="" />
          <input type="text" className="content" placeholder="Content" />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">
        
          <button type="submit">Submit</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
