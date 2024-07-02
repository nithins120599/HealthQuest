package com.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.entity.Doctor;
import com.doctor.entity.Prescription;
import com.doctor.entity.Reviews;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.ReviewsService;
import com.doctor.service.ScheduleService;

@RestController
@RequestMapping("/api/v2")
public class ReviewsController {
	@Autowired
    private ReviewsService revService;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	
	@PostMapping("/addReviews")
    public ResponseEntity<String> createSchedule(@RequestBody Reviews reviews) {
    	reviews.setReviewId(databaseaSequencesGeneratorService.generateSequence(Reviews.SEQUENCE_NAME));
    	revService.addReviews(reviews);
        return ResponseEntity.status(HttpStatus.CREATED).body("Reviews added successfully.");
    }

	
	@GetMapping("/allReviews")
	public ResponseEntity<List<Reviews>> getAllReviews(){
		List<Reviews> revs = revService.getAllReviews();
		ResponseEntity<List<Reviews>> entity = new ResponseEntity<>(revs,HttpStatus.OK);
		return entity;
	}
	
	
	  @GetMapping(value="/getReview/{reviewId}")
		public ResponseEntity<Reviews> getEmployee(@PathVariable("reviewId") long reviewId){
			
		  Reviews revs=revService.getReviewsById(reviewId);
			
			if(revs !=null) {
				return ResponseEntity.ok(revs);
				
			}else {
				return ResponseEntity.notFound().build();
			}
			
		}
	  
	  
	  @DeleteMapping("/deleteReviews/{reviewId}")
		public ResponseEntity<Boolean> deleteProduct(@PathVariable("reviewId") long reviewId){
			
			boolean flag;
			if(revService.isReviewsExist(reviewId)){
				flag = revService.deleteReviews(reviewId);
			}else {
				flag = false;
			}
			
			return new ResponseEntity<>(flag,HttpStatus.OK);
			
		}
	  
	  
	  
	  
	    @PutMapping(value="/updateReviews/{reviewId}")
		public ResponseEntity<Boolean> updateEmployee(@PathVariable("reviewId") long reviewId, @RequestBody Reviews reviews)
		{
			
			boolean flag;
			if(revService.isReviewsExist(reviewId)){
				flag = revService.updateReviews(reviews);
			}else {
				flag = false;
			}
			
			return new ResponseEntity<>(flag, HttpStatus.OK);
			
		}
}
