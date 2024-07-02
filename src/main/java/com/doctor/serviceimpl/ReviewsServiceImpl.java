package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Doctor;
import com.doctor.entity.Reviews;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.ReviewsRepository;
import com.doctor.service.ReviewsService;

@Service
public class ReviewsServiceImpl implements ReviewsService{
	@Autowired
    private ReviewsRepository reviewRepo;

	@Override
	public void addReviews(Reviews reviews) {
		// TODO Auto-generated method stub
		reviewRepo.save(reviews);
	}

	@Override
	public List<Reviews> getAllReviews() {
		List<Reviews> rev=reviewRepo.findAll();
		return rev;
	}
	

	@Override
	public boolean isReviewsExist(long reviewId) {
		Optional<Reviews> rev=reviewRepo.findById(reviewId);
		if (rev.isPresent()) {
			return true;
		}
		return false;
	}
	

	@Override
	public Reviews getReviewsById(long reviewId) {
		Optional<Reviews> review = reviewRepo.findById(reviewId);
		Reviews revs;
		if (review.isPresent()) {
			revs=review.get();
		}else {
			throw new ResourceNotFoundException("Reviews", "reviewId", reviewId);

		}
		return revs;
	}
	
	

	@Override
	public boolean deleteReviews(long reviewId) {
		Optional<Reviews> rev = reviewRepo.findById(reviewId);
		if (rev.isPresent()) {
			reviewRepo.deleteById(reviewId);
			return true;
		}else {
			return false;
		}
	}
	
	

	@Override
	public boolean updateReviews(Reviews reviews) {
		Optional<Reviews> rev = reviewRepo.findById(reviews.getReviewId());
		if (rev.isPresent()) {
			reviewRepo.save(reviews);
			return true;
		}else {
			return false;
		}
	}
	
	

}
