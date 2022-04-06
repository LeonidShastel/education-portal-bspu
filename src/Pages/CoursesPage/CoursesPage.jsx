import React, {useEffect, useState} from 'react';
import {Accordion, AccordionPanel, Anchor, Box, Button, Heading, Spinner, Tag, Text, TextInput} from "grommet";
import {Add} from "grommet-icons";
import {useHistory} from "react-router-dom";
import axios from "axios";

const CoursesPage = ({user}) => {
    const [courses, setCourses] = useState([]);

    const [titleNewCourse, setTitleNewCourse] = useState("");
    const [titleNewSectionCourse, setTitleNewSectionCourse] = useState("");

    const [waitResponse, setWaitResponse] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost/courses")
            .then(({data}) => {
                console.log(data)
                setCourses(data.data)
            })
            .catch(console.error)
            .finally(() => setWaitResponse(false))
    }, [waitResponse])

    const CreateNewCourse = () => {
        setWaitResponse(true);

        const formData = new FormData();
        formData.append("title", titleNewCourse)

        axios({
            method: "POST",
            url: "http://localhost/courses",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        })
            .then(res => console.log(res))
            .catch(console.error)
            .finally(() => setWaitResponse(false))
    }

    const CreateNewSectionCourse = ()=>{
        
    }

    return (
        <Box justify={"center"} align={"center"} fill={"vertical"} gap={"medium"}>
            {waitResponse ?
                <Spinner/> :
                <Accordion gap={"small"} width={"large"}>
                    {courses.length ?
                        courses.map(el => (
                            <AccordionPanel key={`course-${el.id}`}
                                            label={<Heading level={"3"}
                                                            margin={{vertical: "small"}}>{el.title}</Heading>}>
                                <Box pad="medium" background="light-2" gap={"medium"}>
                                    {
                                        el["sub-title"].length ? el["sub-title"].map(course => (
                                            <Anchor key={`course-${el.id}-${course.id}`} label={course.title}
                                                    onClick={() => history.push(`/courses/${el.title.toLowerCase()}/${course.id}`)}/>
                                        )) : <Heading level={"4"}>Курс в разработке</Heading>
                                    }
                                    {
                                        user.permissions === "admin" ? <Box gap={"small"}>
                                            <TextInput value={titleNewCourse}
                                                       onChange={el => setTitleNewCourse(el.target.value)}
                                                       size={"small"}/>
                                            <Button icon={<Add/>} label={"Добавить раздел"}/>
                                        </Box> : null

                                    }
                                </Box>
                            </AccordionPanel>
                        )) : <Heading level={"3"}>Курсы отсутствуют</Heading>
                    }
                </Accordion>
            }
            {
                user.permissions === "admin" ? <Box gap={"small"}>
                    <TextInput value={titleNewCourse} onChange={el => setTitleNewCourse(el.target.value)}/>
                    <Button icon={<Add/>} label={"Добавить курс"} onClick={CreateNewCourse}/>
                </Box> : null
            }
        </Box>
    );
};

export default CoursesPage;