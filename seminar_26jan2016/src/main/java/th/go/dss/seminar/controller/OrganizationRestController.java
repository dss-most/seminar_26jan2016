package th.go.dss.seminar.controller;

import java.util.ArrayList;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import th.go.dss.seminar.model.BreakoutMeetingRoom;
import th.go.dss.seminar.model.Organization;
import th.go.dss.seminar.model.Person;
import th.go.dss.seminar.model.RegisterStatus;
import th.go.dss.seminar.model.Registration;
import th.go.dss.seminar.model.Title;
import th.go.dss.seminar.service.SeminarService;

@RestController
public class OrganizationRestController {
	
	@Autowired
	private SeminarService seminarService;
	
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value="/Register", method=RequestMethod.POST)
	public String getRegistration(@RequestBody JsonNode node){
		Organization org = new Organization();
		org.setName(node.path("name").asText());
		org.setAddress1(node.path("address1").asText());
		org.setAddress2(node.path("address2").asText());
		org.setTelephone(node.path("telephone").asText());
		org.setEmail(node.path("email").asText());
		org.setFax(node.path("fax").asText());
		
		log.info(">>>>>> " + org.getName());
		
		String status = node.path("status").asText();
		if(status.equals("ATTEND")) {
			org.setStatus(RegisterStatus.ATTEND);
			
			
			org.setPeople(new ArrayList<Person>());
			for(JsonNode personNode : node.path("people")) {
				
				Person p1 = new Person();
				
				p1.setFirstName(personNode.path("firstName").asText());

				
				p1.setEmail(personNode.path("email").asText());
				p1.setJobTitle(personNode.path("jobTitle").asText());
				p1.setLastName(personNode.path("lastName").asText());
				
				log.info("people" + p1.getFirstName());
				String title = personNode.path("title").asText();
				switch(title) {
				case "MR":
					p1.setTitle(Title.Mr);
					break;
				case "MISS":
					p1.setTitle(Title.Miss);
					break;
				case "MRS":
					p1.setTitle(Title.Mrs);
					break;
				}
				
				String room = personNode.path("breakoutRoom").asText();
				Registration reg = new Registration();
				switch(room) {
				case "ROOM1":
					reg.setBreakoutRoom(BreakoutMeetingRoom.ROOM1);
					break;
				case "ROOM2":
					reg.setBreakoutRoom(BreakoutMeetingRoom.ROOM2);
					break;
				case "ROOM3":
					reg.setBreakoutRoom(BreakoutMeetingRoom.ROOM3);
					break;
				case "ROOM4":
					reg.setBreakoutRoom(BreakoutMeetingRoom.ROOM4);
					break;
				}
				reg.setCreatedTime(new Date());
				reg.setPerson(p1);
				p1.setRegistration(reg);
				p1.setOrganization(org);
				
				org.getPeople().add(p1);
				
			}
			
		} else {
			org.setStatus(RegisterStatus.NOT_ATTEND);
		}
		
		// now we can save Organization
		seminarService.saveOrganization(org);
		
		return "OK";
	}
}
