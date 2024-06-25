package com.empower.ecom.model;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class login {
@Id
@GeneratedValue(strategy =GenerationType.AUTO)


private Integer id;

private String email;

private String password;

private String username;
private String phonenumber;

public Integer getId() {
    return id;
}

public void setId(Integer id) {
    this.id = id;
}


public String  getemail() {
    return email;
}

public void setemail(String email) {
    this.email = email;
}

public String getpassword() {
    return password;
}

public void setpassword(String password) {
    this.password = password;
}
public String getusername() {
    return username;
}

public void setusername(String username) {
    this.username = username;
}
public String getphonenumber() {
    return phonenumber;
}

public void setphonenumber(String phonenumber) {
    this.phonenumber = phonenumber;
}


@Override
public String toString() {
    return "User{" +
    		  "id=" + id +
              ", email='" + email + '\'' +
              ", password='" + password + '\'' +
              ", username='" + username + '\'' +
              ", phonenumber='" + phonenumber + '\''+
              '}';
}

}
