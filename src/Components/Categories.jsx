import { useState, useEffect } from "react";
import { getCategories } from "../utils";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((categoryData) => {
        setCategories(categoryData);
        setLoading(false);
        return categoryData;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5 pb-3 font-monospace">
      <h1 className="mb-3 text-center">All categories</h1>

      <ul className="list-group ">
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
    </div>
  );
}

export default Categories;
