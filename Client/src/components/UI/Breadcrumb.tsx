import { Link, useLocation } from "react-router-dom";
import styles from "./breadcrumb.module.scss";

const Breadcrumb = ({ current }: { current?: string }) => {
  const location = useLocation();

  let currentLink: string[] = [];

  const links = location.pathname.split("/").filter((crumb) => {
    return crumb !== "";
  });

  const home = { name: "Home", link: "/" };

  const crumbs = [
    home,
    ...links.map((name, index, crumbs) => {
      currentLink.push(`/${name}`);
      name = name.charAt(0).toUpperCase() + name.slice(1);

      let crumb_name =
        index === crumbs.length - 1 && current ? current : !current? name: name;

      return { name: crumb_name, link: currentLink.join("") };
    }),
  ];

  return <ul className={styles.breadcrumb}>
    {crumbs.map((crumb,index)=>{
      return <li key={index}>
      <span>{index !== 0 && index !== crumbs.length && "/"}</span>
      <Link to={crumb.link}>
        {crumb.name}
      </Link>
    </li>
    })}
  </ul>;
};

export default Breadcrumb;
