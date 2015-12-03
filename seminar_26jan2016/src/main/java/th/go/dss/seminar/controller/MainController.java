package th.go.dss.seminar.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import th.go.dss.seminar.model.Organization;
import th.go.dss.seminar.service.SeminarService;
import th.go.dss.seminar.webui.Page;

@Controller
public class MainController {

	@Autowired
	private SeminarService seminarService;
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value="/")
	public String Home(Model model) {
		Page page = new Page();
		page.setDefaultPanel(0);
		
		model.addAttribute("page", page);
		
		return "Home";
	}
	
	

	
	@RequestMapping(value="/{pageName}", method={RequestMethod.GET})
	public String getPage(@PathVariable String pageName, Model model) {
		Page page = new Page();
		page.setDefaultPanel(0);
		
		switch(pageName) {
		case "Home":
		case "Schedule":
		case "Venue":
			page.setDefaultPanel(0);
			break;
			
		case "CheckRegistration":
			Iterable<Organization> orgs = seminarService.findAllOrganization();
			model.addAttribute("orgs", orgs);
			page.setDefaultPanel(1);
			break;
		case "Register":
			page.setDefaultPanel(1);
			break;
		case "Contact":
		case "AboutDSS":
			page.setDefaultPanel(3);
			break;
		default:
			page.setDefaultPanel(0);
			break;
		}
		
		
		model.addAttribute("page", page);
		
		return pageName;
	}
}
