package com.spring.userService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.userDao.UserDto;
import com.spring.userEntity.User;
import com.spring.userRepositary.UserRepositary;

@Service
public class UserService {
	@Autowired
	UserRepositary userRepositary;

	public String addUserData(UserDto userDto) {
		String response = "Register Sucessfully";
		if (userDto != null) {
			User user = changeUserDtoToUser(userDto);
			userRepositary.save(user);
		} else {
			response = "Please Fill The Fields";
		}
		return response;
	}

	private User changeUserDtoToUser(UserDto userDto) {
		User user = new User();
		user.setFullName(userDto.getFullName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		return user;
	}

}
