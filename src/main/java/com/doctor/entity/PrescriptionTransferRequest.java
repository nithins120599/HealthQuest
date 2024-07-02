package com.doctor.entity;
import java.util.List;

public class PrescriptionTransferRequest {
    private List<String> prescriptions;
    private long appId;

    // Getters and Setters

    public List<String> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<String> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public long getAppId() {
        return appId;
    }

    public void setAppId(long appId) {
        this.appId = appId;
    }
}
