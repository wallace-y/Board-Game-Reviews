import { useState, useEffect } from "react";
import { getCategories } from "../utils";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((categoryData) => {
        setCategories(categoryData);
        return categoryData;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul className="list-group">
      {categories.map((category) => {
        return (
          <Link
            to={`/reviews?category=${category.slug}`}
            key={category.slug}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold text-capitalize">{category.slug}</div>
              {category.description}
            </div>
          </Link>
        );
      })}
    </ul>
  );
}

export default Categories;
