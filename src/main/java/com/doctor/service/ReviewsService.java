package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Doctor;
import com.doctor.entity.Reviews;

@Service
public interface ReviewsService {
	void addReviews(Reviews reviews);
	
	List<Reviews> getAllReviews();
	   boolean isReviewsExist(long reviewId);
	   Reviews getReviewsById(long reviewId);
	   boolean deleteReviews(long reviewId);
	   boolean updateReviews(Reviews reviews);
}
