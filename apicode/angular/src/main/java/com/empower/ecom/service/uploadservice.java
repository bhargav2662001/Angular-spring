package com.empower.ecom.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.empower.ecom.Repository.uploadRepository;
import com.empower.ecom.model.upload;

@Service
public class uploadservice {

	private final uploadRepository uploadRepository;
	
	public uploadservice(uploadRepository uploadRepository) {
        this.uploadRepository = uploadRepository;
    }
	
	public upload storeFile(upload fileUploadDTO) throws IOException {
		System.out.printf("fileUploadDTO",fileUploadDTO);
	        return uploadRepository.save(fileUploadDTO);
	    }
	
	public List<upload> getAllUploadedFiles() {
        return uploadRepository.findAll(); // Assuming findAll() fetches all records from repository
    }
	public upload getUploadedFileById(Integer fileId) {
        Optional<upload> file = uploadRepository.findById(fileId);
        return file.orElse(null); // Return null if file not found, handle as needed
    }
	
	public upload updateFile(Integer id, upload updatedFileDetails) throws IOException {
        // Find the existing file by ID
        Optional<upload> existingFileOptional = uploadRepository.findById(id);

        if (existingFileOptional.isPresent()) {
            upload existingFile = existingFileOptional.get();

            // Update the file details
            existingFile.setemail(updatedFileDetails.getemail());
            existingFile.setfilename(updatedFileDetails.getfilename());
            existingFile.setfiletype(updatedFileDetails.getfiletype());
            existingFile.setfiledrive(updatedFileDetails.getfiledrive());
            // Add other fields as necessary

            // Save the updated file back to the repository
            return uploadRepository.save(existingFile);
        } else {
            // File not found, handle as needed
            return null;
        }
    }
}
