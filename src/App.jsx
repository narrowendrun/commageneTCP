import FiltersContainer from "./components/filtersContainer";
import Interface from "./components/interface";
import OptionsContainer from "./components/optionsContainer";
import SaveToFile from "./components/saveToFlie";
import CacheSection from "./components/Cache";
import imgUrl1 from "./images/mentat3.png";
import { useEffect, useState } from "react";

function checkVisits() {
  fetch("http://127.0.0.1:5000/commagenetcp/analytics")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.visits);
      document.getElementById("visits").textContent = data.visits;
    })
    .catch((err) => console.log(err));
}
//setInterval(checkVisits, 10000);

export default function App() {
  const [isloggedin, setIsLoggedIn] = useState();
  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/commagenetcp/login")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data == "logged out") {
  //         window.location.replace("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // });
  const today = new Date();
  const g = new Intl.DateTimeFormat("en-gb", {
    timeStyle: "medium",
    timeZone: "GMT",
  });
  const f = new Intl.DateTimeFormat("en-gb", {
    dateStyle: "short",
    timeZone: "GMT",
  });
  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/commagenetcp/analytics", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: "user",
  //       date: f.format(today),
  //       time: g.format(today),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/commagenetcp/analytics")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.visits);
  //       document.getElementById("visits").textContent = data.visits;
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <a>
            page visits : <span id="visits">Loading...</span>
          </a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="rfe.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                rfe page
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://docs.google.com/presentation/d/1wreo3Jc78Nfo-yLCosl-DueW3IavtqMDgwmsHQve4ik/edit?usp=sharing"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <Interface />
      <br />
      <OptionsContainer />
      <br />
      <FiltersContainer />

      <div className="text-center">
        <img id="logo2" src={imgUrl1} />
      </div>
      <br />
      <br />
      <br />
    </>
  );
}
