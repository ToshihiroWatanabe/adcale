package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.demo.model.Schedule;

/**
 * schedulesテーブルのマッパーインターフェースです。
 */
@Mapper
public interface ScheduleMapper {

    @Select("select * from schedules where calendar_id = #{calendarId}")
    public List<Schedule> findByCalendarId(String calendarId);

    @Select("select * from schedules where id = #{id}")
    public Schedule findById(String id);

    @Insert("insert into schedules(id, calendar_id, date, article_title, article_url, author_name, author_url) values (#{id}, #{calendarId}, #{date}, #{articleTitle}, #{articleUrl}, #{authorName}, #{authorUrl})")
    public boolean create(Schedule schedule);

    @Update("update schedules set article_title=#{articleTitle}, article_url=#{articleUrl}, author_name=#{authorName}, author_url=#{authorUrl} where date=#{date}")
    public boolean update(Schedule schedule);
}
