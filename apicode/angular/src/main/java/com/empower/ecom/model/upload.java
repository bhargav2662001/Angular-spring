package com.empower.ecom.model;

import java.io.IOException;
import java.util.Base64;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;

@Entity
public class upload {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    @SequenceGenerator(name = "person_seq", sequenceName = "PERSON_SEQ", allocationSize = 1)
    
    private Integer id;
    
    private String email;
    private String filename;
    private String filetype;

    @Lob // Specify that this field should be treated as a large object in the database
    @JsonDeserialize(using = Base64Deserializer.class)
    private byte[] filedrive;

    // Getters and setters...

    public Integer getid() {
        return id;
    }

    public void setid(Integer id) {
        this.id = id;
    }

    public String getemail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }

    public String getfilename() {
        return filename;
    }

    public void setfilename(String filename) {
        this.filename = filename;
    }

    public String getfiletype() {
        return filetype;
    }

    public void setfiletype(String filetype) {
        this.filetype = filetype;
    }

    public byte[] getfiledrive() {
        return filedrive;
    }

    public void setfiledrive(byte[] filedrive) {
        this.filedrive = filedrive;
    }

    // Custom Deserializer for Base64 encoded byte array
    public static class Base64Deserializer extends JsonDeserializer<byte[]> {
        @Override
        public byte[] deserialize(JsonParser jsonParser, DeserializationContext ctxt) 
                throws IOException, JsonProcessingException {
            String base64String = jsonParser.getText(); // Correct method to get JSON string value
            return Base64.getDecoder().decode(base64String);
        }
    }
}
