import { memo, useEffect, useState } from "react";
import { type TPriceRange } from "../../types/products";
import ReactSlider from "react-slider";
import "./priceRange.scss";
import useDebounce from "../../hooks/useDebounce";
import useProductQuery from "../../hooks/useProductQuery";

type Params = {
  priceRange: TPriceRange;
};

const PriceRange = ({ priceRange }: Params) => {
  const [values, setValues] = useState<TPriceRange>(priceRange);
  const [userChangedValues, setUserChangedValues] = useState(false);

  const { setQuery: setMaxQuery, queryValue: maxQueryValue } =
    useProductQuery("price_max");
  const { setQuery: setMinQuery, queryValue: minQueryValue } =
    useProductQuery("price_min");

  const debouncedMaxValue = useDebounce(values.max, 400);
  const debouncedMinValue = useDebounce(values.min, 400);

  useEffect(() => {
    if (userChangedValues) {
      setMaxQuery(debouncedMaxValue?.toString());
    }
  }, [debouncedMaxValue]);

  useEffect(() => {
    if (userChangedValues) {
      setMinQuery(debouncedMinValue?.toString());
    }
  }, [debouncedMinValue]);

  useEffect(() => {
    if (!userChangedValues) {
      if (!minQueryValue && !maxQueryValue) {
        return setValues(priceRange);
      }
      if (maxQueryValue) {
        setValues((prev) => ({
          ...prev,
          max: parseInt(maxQueryValue),
        }));
      }
      if (minQueryValue) {
        setValues((prev) => ({
          ...prev,
          min: parseInt(minQueryValue),
        }));
      }
    }
  }, [priceRange]);

  const handleValues = (val: number[]) => {
    // to avoid bugging the slider
    if (!(val[0] < priceRange.min) && !(val[1] > priceRange.max)) {
      setUserChangedValues(true);
      setValues({ min: val[0], max: val[1] });
    }
  };

  return (
    <div className="price_range">
      <h3>Price range</h3>
      <ReactSlider
        max={priceRange.max}
        min={priceRange.min}
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={[values.min, values.max]}
        onChange={(val) => {
          handleValues(val);
        }}
        minDistance={priceRange.max - priceRange.min > 1000 ? 100 : 50}
        step={10}
      />
      <p>Min: {values.min}</p>
      <p>Max: {values.max}</p>
    </div>
  );
};

export default memo(PriceRange);
