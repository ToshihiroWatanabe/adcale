package com.example.demo.mapper;

import com.example.demo.model.Calendar;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * calendarsテーブルのマッパーインターフェースです。
 */
@Mapper
public interface CalendarMapper {

    @Select("select * from calendars where id = #{id} AND deleted_at IS NULL")
    public Calendar findById(String id);

    @Insert("insert into calendars (id, auth_key, title, start_at, end_at) values (#{id}, #{authKey}, #{title}, #{startAt}, #{endAt});")
    public boolean create(Calendar calendar);
}
