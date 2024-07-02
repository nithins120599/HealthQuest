package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.doctor.entity.PrescriptionTransferRequest;
import com.doctor.entity.Prescription;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.PharmacyRepository;
import com.doctor.repository.PrescriptionRepository;
import com.doctor.service.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {
    @Autowired
    private PrescriptionRepository preRepo;

    private static final Logger logger = LoggerFactory.getLogger(PrescriptionServiceImpl.class);

    @Override
    public List<Prescription> getAllPrescription() {
        List<Prescription> appo = preRepo.findAll();
        return appo;
    }

    @Override
    public boolean isPrescriptionExist(long prescriptionId) {
        Optional<Prescription> appo = preRepo.findById(prescriptionId);
        return appo.isPresent();
    }

    @Override
    public Prescription getPrescriptionById(long prescriptionId) {
        Optional<Prescription> doctor = preRepo.findById(prescriptionId);
        if (doctor.isPresent()) {
            return doctor.get();
        } else {
            throw new ResourceNotFoundException("Prescription", "prescriptionId", prescriptionId);
        }
    }

    @Override
    public boolean deletePrescription(long prescriptionId) {
        Optional<Prescription> doc = preRepo.findById(prescriptionId);
        if (doc.isPresent()) {
            preRepo.deleteById(prescriptionId);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean updatePrescription(Prescription prescription) {
        Optional<Prescription> doc = preRepo.findById(prescription.getPrescriptionId());
        if (doc.isPresent()) {
            preRepo.save(prescription);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Prescription createPrescription(Prescription prescription) {
        return preRepo.save(prescription);
    }

    @Override
    public List<Prescription> findByAppId(long appId) {
        return preRepo.findByAppId(appId);
    }

    @Override
    public List<Prescription> getPrescriptionsByAppId(long appId) {
        return preRepo.findByAppId(appId);
    }

    @Override
    public boolean transferPrescriptions(long pharmacyId, List<String> prescriptions, long appId) {
        try {
            logger.info("Received request to transfer prescriptions to pharmacyId: {} for appId: {}", pharmacyId, appId);
            
            // Fetch existing prescriptions by appointmentId
            List<Prescription> existingPrescriptions = preRepo.findByAppId(appId);
            
            for (String prescriptionDetails : prescriptions) {
                Prescription prescription = existingPrescriptions.stream()
                    .filter(p -> p.getPrescription().equals(prescriptionDetails))
                    .findFirst()
                    .orElse(new Prescription());
                
                prescription.setPrescription(prescriptionDetails);
                prescription.setAppId(appId);
                prescription.setPharmacyId(pharmacyId);
                preRepo.save(prescription);
                
                logger.info("Transferred prescription: {} to pharmacy: {}", prescriptionDetails, pharmacyId);
            }
            return true;
        } catch (Exception e) {
            logger.error("Error transferring prescriptions to pharmacy: {}", pharmacyId, e);
            return false;
        }
    }

    @Override
    public List<Prescription> getPrescriptionsByPharmacyId(Long pharmacyId) {
    	  return preRepo.findByPharmacyId(pharmacyId);

    }
}
