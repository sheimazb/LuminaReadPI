import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars, onChange }) => {
    const [selectedStars, setSelectedStars] = useState(0);

    const handleStarClick = (starIndex) => {
        setSelectedStars(starIndex + 1);
        onChange(starIndex + 1);
    };

    return (
        <Flex justifyContent={"center"}>
            {[...Array(totalStars)].map((_, index) => {
                const starId = index + 1;
                return (
                    <FaStar
                        key={index}
                        onClick={() => handleStarClick(index)}
                        color={starId <= selectedStars ? "yellow" : "gray"}
                        fontSize={"30px"}
                        cursor={"pointer"}
                    />
                );
            })}
        </Flex>
    );
};

export default StarRating;
