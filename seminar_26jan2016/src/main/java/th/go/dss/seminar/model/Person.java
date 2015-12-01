package th.go.dss.seminar.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="registration")
@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property="id", scope=Person.class)
public class Person implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 427994705076255011L;

	@Id
	@GeneratedValue(generator="table", strategy=GenerationType.TABLE)
	@TableGenerator(name = "table", allocationSize = 10)
	private Long id;
	
	@OneToOne(mappedBy="person")
	private Registration registration;
	
	@ManyToOne
	@JoinColumn(name="org_id")
	private Organization organization;
	
	@Enumerated(EnumType.STRING)
	@Column(name="sex")
	private Sex sex;
	
	@Enumerated(EnumType.STRING)
	@Column(name="title")
	private Title title;
	
	@Column(name="firstName")
	private String firstName;
	
	@Column(name="lastName")
	private String lastName;
	
	@Column(name="jobTitle")
	private String jobTitle;
	
	@Column(name="email")
	private String email;
	
	@Column(name="telephone")
	private String telepone;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Registration getRegistration() {
		return registration;
	}
	public void setRegistration(Registration registration) {
		this.registration = registration;
	}
	public Sex getSex() {
		return sex;
	}
	public void setSex(Sex sex) {
		this.sex = sex;
	}
	public Title getTitle() {
		return title;
	}
	public void setTitle(Title title) {
		this.title = title;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelepone() {
		return telepone;
	}
	public void setTelepone(String telepone) {
		this.telepone = telepone;
	}
	public Organization getOrganization() {
		return organization;
	}
	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
	
	
	
}
