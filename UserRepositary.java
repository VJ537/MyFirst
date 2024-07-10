package com.spring.userRepositary;

import org.springframework.data.repository.CrudRepository;

import com.spring.userEntity.User;

public interface UserRepositary extends CrudRepository<User, Long> {

}
