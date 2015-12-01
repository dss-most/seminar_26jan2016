package th.go.dss.seminar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import th.go.dss.seminar.model.Organization;
import th.go.dss.seminar.webui.Page;

@Controller
public class MainController {

	@RequestMapping(value="/")
	public String Home(Model model) {
		Page page = new Page();
		page.setDefaultPanel(0);
		
		model.addAttribute("page", page);
		
		return "Home";
	}
	
	@RequestMapping(value="Register", method=RequestMethod.POST)
	public String getRegistration(Model model, @ModelAttribute("org") Organization org, BindingResult result){
		Page page = new Page();
		page.setDefaultPanel(2);
		
		
		
		model.addAttribute("page", page);
		return "Register";
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
