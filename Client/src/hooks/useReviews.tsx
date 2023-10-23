import {
  useGetReviewsQuery,
} from "../redux/services/reviewsApi";
import { useEffect, useState} from "react";

type Params = {
  id: number;
};

const useReviews = ({ id }: Params) => {
  const [offset, setOffset] = useState(0);
  const [date, setDate] = useState(new Date().getTime())

  useEffect(()=>{
    setDate(new Date().getTime())
  },[])

  const { data, isLoading } = useGetReviewsQuery({ offset, id, date});

  return {
    reviews: data?.reviews,
    isLoading,
    hasNextPage: data?.hasNextPage,
    setOffset,
    offset,
  };
};

export default useReviews;
