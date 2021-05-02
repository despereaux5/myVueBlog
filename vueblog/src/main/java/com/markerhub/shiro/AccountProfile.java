package com.markerhub.shiro;

import lombok.Data;

import java.io.Serializable;

/**
 * 登录成功之后返回的一个用户信息的载体
 * 实际上是用户非加密的信息
 */
@Data
public class AccountProfile implements Serializable {

    private Long id;

    private String username;

    private String avatar;

    private String email;

}
