-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- Room_attribute Table Create SQL
CREATE TABLE Room_attribute
(
    `grade`       VARCHAR(20)    NOT NULL    COMMENT '객실등급', 
    `price`       VARCHAR(20)    NOT NULL    COMMENT '가격', 
    `people_num`  INT            NOT NULL    COMMENT '인원', 
    PRIMARY KEY (grade)
);

ALTER TABLE Room_attribute COMMENT '객실 속성';


-- Customer_name Table Create SQL
CREATE TABLE Customer_name
(
    `name_id`       INT            NOT NULL    AUTO_INCREMENT COMMENT '이름ID', 
    `KR_FirstName`  VARCHAR(20)    NULL        COMMENT 'KR이름(First_name))', 
    `KR_LastName`   VARCHAR(20)    NULL        COMMENT 'KR성(Last_name)', 
    `FR_FirstName`  VARCHAR(20)    NOT NULL    COMMENT 'FR이름(First_name)', 
    `FR_LastName`   VARCHAR(20)    NOT NULL    COMMENT 'FR성(Last_name)', 
    PRIMARY KEY (name_id)
);

ALTER TABLE Customer_name COMMENT '이름';


-- Room Table Create SQL
CREATE TABLE Room
(
    `room_number`  INT            NOT NULL    AUTO_INCREMENT COMMENT '방 번호', 
    `grade`        VARCHAR(20)    NOT NULL    COMMENT '객실등급', 
    PRIMARY KEY (room_number)
);

ALTER TABLE Room COMMENT '객실';

ALTER TABLE Room ADD CONSTRAINT FK_Room_grade_Room_attribute_grade FOREIGN KEY (grade)
 REFERENCES Room_attribute (grade)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Customer_info Table Create SQL
CREATE TABLE Customer_info
(
    `customer_id`  INT             NOT NULL    AUTO_INCREMENT COMMENT '고객ID', 
    `name_id`      INT             NOT NULL    COMMENT '이름ID', 
    `birthday`     VARCHAR(20)     NOT NULL    COMMENT '생년월일', 
    `gender`       VARCHAR(20)     NOT NULL    COMMENT '성별', 
    `e-mail`       VARCHAR(20)     NOT NULL    COMMENT '이메일', 
    `phone`        VARCHAR(20)     NOT NULL    COMMENT '전화번호', 
    `login_ID`     VARCHAR(20)     NULL        COMMENT '로그인ID', 
    `password`     varchar(100)    NULL        COMMENT '비밀번호', 
    PRIMARY KEY (customer_id)
);

ALTER TABLE Customer_info COMMENT '고객정보';

ALTER TABLE Customer_info ADD CONSTRAINT FK_Customer_info_name_id_Customer_name_name_id FOREIGN KEY (name_id)
 REFERENCES Customer_name (name_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Card_info Table Create SQL
CREATE TABLE Card_info
(
    `card_id`   INT            NOT NULL    AUTO_INCREMENT COMMENT '카드ID', 
    `company`   VARCHAR(20)    NOT NULL    COMMENT '카드회사', 
    `card_num`  VARCHAR(20)    NOT NULL    COMMENT '카드번호', 
    `end_date`  VARCHAR(20)    NOT NULL    COMMENT '유효기간', 
    PRIMARY KEY (card_id)
);

ALTER TABLE Card_info COMMENT '카드정보';


-- Breakfast Table Create SQL
CREATE TABLE Breakfast
(
    `food_id`   INT    NOT NULL    AUTO_INCREMENT COMMENT '조식ID', 
    `how_many`  INT    NOT NULL    COMMENT '인원', 
    `count`     INT    NOT NULL    COMMENT '신청횟수', 
    PRIMARY KEY (food_id)
);

ALTER TABLE Breakfast COMMENT '조식';


-- Reservation Table Create SQL
CREATE TABLE Reservation
(
    `reserve_id`     INT             NOT NULL    AUTO_INCREMENT COMMENT '예약ID', 
    `reserve_date`   VARCHAR(20)     NOT NULL    COMMENT '등록일', 
    `room_number`    VARCHAR(20)     NOT NULL    COMMENT '방 번호', 
    `food_id`        INT             NULL        COMMENT '조식ID', 
    `customer_id`    INT             NOT NULL    COMMENT '고객ID', 
    `check_in`       DATE            NOT NULL    COMMENT '체크인 날짜', 
    `check_out`      DATE            NOT NULL    COMMENT '체크아웃 날짜', 
    `how_many`       INT             NOT NULL    COMMENT '인원', 
    `extra_service`  VARCHAR(200)    NULL        COMMENT '추가요청', 
    `card_id`        INT             NOT NULL    COMMENT '카드ID', 
    PRIMARY KEY (reserve_id)
);

ALTER TABLE Reservation COMMENT '예약';

ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_customer_id_Customer_info_customer_id FOREIGN KEY (customer_id)
 REFERENCES Customer_info (customer_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_card_id_Card_info_card_id FOREIGN KEY (card_id)
 REFERENCES Card_info (card_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_room_number_Room_room_number FOREIGN KEY (room_number)
 -- REFERENCES Room (room_number)  ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_food_id_Breakfast_food_id FOREIGN KEY (food_id)
 REFERENCES Breakfast (food_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Staff_management Table Create SQL
CREATE TABLE Staff_management
(
    `staff_id`  INT            NOT NULL    AUTO_INCREMENT COMMENT '직원ID', 
    `dept`      VARCHAR(20)    NOT NULL    COMMENT '부서', 
    `name`      VARCHAR(20)    NOT NULL    COMMENT '이름', 
    `phone`     VARCHAR(20)    NOT NULL    COMMENT '전화번호', 
    `position`  VARCHAR(20)    NOT NULL    COMMENT '직책', 
    `charge`    INT            NULL        COMMENT '전담', 
    PRIMARY KEY (staff_id)
);

ALTER TABLE Staff_management COMMENT '직원 관리';


-- Detailed_fee Table Create SQL
CREATE TABLE Detailed_fee
(
    `reserve_id`  INT    NOT NULL    COMMENT '예약ID', 
    `t_br`        INT    NULL        COMMENT '총 조식요금', 
    `t_rm`        INT    NOT NULL    COMMENT '총 객실요금', 
    PRIMARY KEY (reserve_id)
);

ALTER TABLE Detailed_fee COMMENT '예약별 세부요금';

ALTER TABLE Detailed_fee ADD CONSTRAINT FK_Detailed_fee_reserve_id_Reservation_reserve_id FOREIGN KEY (reserve_id)
 REFERENCES Reservation (reserve_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Room_management Table Create SQL
CREATE TABLE Room_management
(
    `room_number`  INT    NOT NULL    AUTO_INCREMENT COMMENT '방 번호', 
    `customer_id`  INT    NOT NULL    COMMENT '고객ID', 
    `staff_id`     INT    NOT NULL    COMMENT '직원ID', 
    `reserve_id`   INT    NOT NULL    COMMENT '예약ID', 
    PRIMARY KEY (room_number)
);

ALTER TABLE Room_management COMMENT '객실 - 현재 묶고 있는 방의 상태 관리';

ALTER TABLE Room_management ADD CONSTRAINT FK_Room_management_room_number_Room_room_number FOREIGN KEY (room_number)
 REFERENCES Room (room_number)  ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE Room_management ADD CONSTRAINT FK_Room_management_customer_id_Customer_info_customer_id FOREIGN KEY (customer_id)
 REFERENCES Customer_info (customer_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE Room_management ADD CONSTRAINT FK_Room_management_staff_id_Staff_management_staff_id FOREIGN KEY (staff_id)
 REFERENCES Staff_management (staff_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE Room_management ADD CONSTRAINT FK_Room_management_reserve_id_Reservation_reserve_id FOREIGN KEY (reserve_id)
 REFERENCES Reservation (reserve_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Room_stock_condition Table Create SQL
CREATE TABLE Room_stock_condition
(
    `condition_id`  INT            NOT NULL    AUTO_INCREMENT COMMENT '재고조건ID', 
    `grade`         VARCHAR(20)    NOT NULL    COMMENT '객실등급', 
    `kind`          VARCHAR(20)    NOT NULL    COMMENT '분류', 
    `attribute`     VARCHAR(20)    NOT NULL    COMMENT '항목', 
    `count`         INT            NOT NULL    COMMENT '개수', 
    PRIMARY KEY (condition_id)
);

ALTER TABLE Room_stock_condition COMMENT '재고조건(최대값)';

ALTER TABLE Room_stock_condition ADD CONSTRAINT FK_Room_stock_condition_grade_Room_attribute_grade FOREIGN KEY (grade)
 REFERENCES Room_attribute (grade)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Hotel_evaluation Table Create SQL
CREATE TABLE Hotel_evaluation
(
    `reserve_id`       INT             NOT NULL    COMMENT '예약ID', 
    `facilities_eval`  INT             NOT NULL    COMMENT '시설 만족도', 
    `service_eval`     INT             NOT NULL    COMMENT '서비스 만족도', 
    `extra_opinion`    VARCHAR(200)    NULL        COMMENT '추가의견', 
    PRIMARY KEY (reserve_id)
);

ALTER TABLE Hotel_evaluation COMMENT '호텔 평가';

ALTER TABLE Hotel_evaluation ADD CONSTRAINT FK_Hotel_evaluation_reserve_id_Reservation_reserve_id FOREIGN KEY (reserve_id)
 REFERENCES Reservation (reserve_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Staff_attendance Table Create SQL
CREATE TABLE Staff_attendance
(
    `attend_idx`  INT     NOT NULL    AUTO_INCREMENT COMMENT '출근부ID', 
    `staff_id`    INT     NOT NULL    COMMENT '직원ID', 
    `date`        DATE    NOT NULL    COMMENT '날짜', 
    `state`       INT     NOT NULL    COMMENT '근태 기록', 
    PRIMARY KEY (attend_idx)
);

ALTER TABLE Staff_attendance COMMENT '직원 출근부';

ALTER TABLE Staff_attendance ADD CONSTRAINT FK_Staff_attendance_staff_id_Staff_management_staff_id FOREIGN KEY (staff_id)
 REFERENCES Staff_management (staff_id)  ON DELETE RESTRICT ON UPDATE RESTRICT;