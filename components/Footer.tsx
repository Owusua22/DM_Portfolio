export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="copyright text-center ">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">sarah Nkansah</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>
        <div className="social-links d-flex justify-content-center">
          <a href="">
            <i className="bi bi-twitter-x" />
          </a>
          <a href="">
            <i className="bi bi-facebook" />
          </a>
          <a href="">
            <i className="bi bi-instagram" />
          </a>
          <a href="">
            <i className="bi bi-linkedin" />
          </a>
        </div>
       
      </div>
    </footer>
  );
}
