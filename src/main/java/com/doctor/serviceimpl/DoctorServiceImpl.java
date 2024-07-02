package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.doctor.entity.Doctor;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.DoctorRepository;
import com.doctor.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService{
	@Autowired
    private DoctorRepository doctorRepo;

	@Override
	public void addDoctor(Doctor doctor) {
		doctorRepo.save(doctor);
	}

	@Override
	public List<Doctor> getAllDoctors() {
		List<Doctor> doc=doctorRepo.findAll();
		return doc;
	}

	@Override
	public boolean isDoctorExist(long doctorId) {
		Optional<Doctor> doc=doctorRepo.findById(doctorId);
		if (doc.isPresent()) {
			return true;
		}
		return false;
	}
	

	/*
	@Override
	public Doctor getDoctorById(long doctorId) {
		Optional<Doctor> doctor = doctorRepo.findById(doctorId);
		Doctor doc;
		if (doctor.isPresent()) {
			doc = doctor.get();
		} else {
			throw new ResourceNotFoundException("Doctor", "doctorId", doctorId);
		}
		return doc;
	}
*/
	
	@Override
	public Optional<Doctor> getDoctorById(long doctorId) {
		// TODO Auto-generated method stub
		return doctorRepo.findById(doctorId);
	}

	@Override
	public boolean deleteDoctor(long doctorId) {
		Optional<Doctor> doc = doctorRepo.findById(doctorId);
		if (doc.isPresent()) {
			doctorRepo.deleteById(doctorId);
			return true;
		} else {
			return false;
		}
	}


	@Override
	public boolean updateDoctor(Doctor doctor) {
		Optional<Doctor> doc = doctorRepo.findById(doctor.getDoctorId());
		if (doc.isPresent()) {
			doctorRepo.save(doctor);
			return true;
		} else {
			return false;
		}
	}

	@Override
    public boolean updateStatusByDoctorId(long doctorId, String status) {
        Optional<Doctor> optionalDoctor = doctorRepo.findById(doctorId);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            doctor.setStatus(status);
            doctorRepo.save(doctor);
            return true; // Successfully updated status
        } else {
            return false; // Doctor with given ID not found
        }
    }

	@Override
	public Doctor findByEmailPassword(Doctor doctor) {
		Doctor doc=doctorRepo.findByEmailAndPassword(doctor.getEmail(), doctor.getPassword());
		return doc;
	}

	 @Override
	    public List<String> findAllSpecializations() {
	        return doctorRepo.findAllSpecializations().stream()
	                .map(Doctor::getSpecialization)
	                .distinct()
	                .toList();
	    }

	    @Override
	    public List<String> findAllLocations() {
	        return doctorRepo.findAllLocations().stream()
	                .map(Doctor::getLocation)
	                .distinct()
	                .toList();
	    }

		@Override
		public List<Doctor> getDoctorsBySpecializationAndLocation(String specialization, String location) {
			 return doctorRepo.findBySpecializationAndLocation(specialization, location);

		}

	
}

