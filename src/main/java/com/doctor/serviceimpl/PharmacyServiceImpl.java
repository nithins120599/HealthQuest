package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Pharmacy;
import com.doctor.entity.User;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.PharmacyRepository;
import com.doctor.service.PharmacyService;
@Service
public class PharmacyServiceImpl implements PharmacyService{
	@Autowired
    private PharmacyRepository pharmacyRepo;

	@Override
	public void addPharmacy(Pharmacy pharmacy) {
		// TODO Auto-generated method stub
		pharmacyRepo.save(pharmacy);
	}

	@Override
	public List<Pharmacy> getAllPharmacies() {
		List<Pharmacy> phar = pharmacyRepo.findAll();
		return phar;
	}
	
	@Override
	public boolean isPharmacyExist(long pharmacyId) {
		Optional<Pharmacy> phar = pharmacyRepo.findById(pharmacyId);
		if (phar.isPresent()) {
			return true;
		}
		return false;
	}
	@Override
	public Pharmacy getPharmacyById(long pharmacyId) {
		Optional<Pharmacy> pharmacy = pharmacyRepo.findById(pharmacyId);
		Pharmacy phar;
		if (pharmacy.isPresent()) {
			phar = pharmacy.get();
		} else {
			throw new ResourceNotFoundException("Pharmacy", "pharmacyId", pharmacyId);
		}
		return phar;
	}

	
	@Override
	public boolean deletePharmacy(long pharmacyId) {
		Optional<Pharmacy> phar = pharmacyRepo.findById(pharmacyId);
		if (phar.isPresent()) {
			pharmacyRepo.deleteById(pharmacyId);
			return true;
		} else {
			return false;
		}
	}


	@Override
	public boolean updatePharmacy(Pharmacy pharmacy) {
		Optional<Pharmacy> phar = pharmacyRepo.findById(pharmacy.getPharmacyId());
		if (phar.isPresent()) {
			pharmacyRepo.save(pharmacy);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Pharmacy findByMobilePassword(Pharmacy pharmacy) {
		
		Pharmacy pharma=pharmacyRepo.findByMobileAndPassword(pharmacy.getMobile(),pharmacy.getPassword());
		return pharma;
	}
}
