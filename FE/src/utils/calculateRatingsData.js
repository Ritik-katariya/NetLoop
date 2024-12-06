export const calculateRatingsData = (reviews) => {
    if (!reviews || reviews.length === 0) {
        return { averageRatings: {}, reviewCounts: {} };
    }

    const result = {};

    reviews.forEach(review => {
        const { doctorId, star } = review;
        if (!result[doctorId]) {
            result[doctorId] = { totalStars: 0, count: 0 };
        }
        result[doctorId].totalStars += parseInt(star);
        result[doctorId].count += 1;
    });

    const averageRatings = {};
    const reviewCounts = {};

    for (const doctorId in result) {
        const { totalStars, count } = result[doctorId];
        averageRatings[doctorId] = (totalStars / count).toFixed(1);
        reviewCounts[doctorId] = count;
    }

    return { averageRatings, reviewCounts };
};