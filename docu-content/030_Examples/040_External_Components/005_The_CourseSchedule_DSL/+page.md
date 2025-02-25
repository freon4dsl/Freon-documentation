<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The CourseSchedule Language

The CourseSchedule DSL revolves about the
scheduling of training courses for adults. The main concepts are courses, rooms, and teachers, and there is a simplified
notion of time. There are 10 time slots in a week, from Monday morning to Friday afternoon. 

The following is the metamodel, which by now you should be able to understand without problems.

```proto
// CourseSchedule/phase1/defs/main.ast

language CourseSchedule

model CourseSchedule {
    persons: Staff[];
    courses: CourseCategory[];
    rooms: Building[];
    schedule: Schedule[];
}

modelunit Schedule {
    name: identifier;
    timeSlots: Slot[];
    file-extension = "scd";     // the file extension used by the parser
}

modelunit Staff {
    name: identifier;
    teachers: Person[];
    file-extension = "prs";     // the file extension used by the parser
}

modelunit CourseCategory {
    courses: Course[];
    file-extension = "crs";     // the file extension used by the parser
}

modelunit Building {
    rooms: Room[];
    file-extension = "bld";     // the file extension used by the parser
}

/* model unit Schedule */
concept Slot {
    time: TimeStamp;
    reference teacher: Person;
    reference room: Room;
    reference course: Course;
}

limited TimeStamp {
    day: number; // 1 = Monday, 2 = Tuesday, etc
    part: number; // 1 indicates morning, 2 indicates afternoon
    MondayMorning = { day: 1, part: 1 }
    TuesdayMorning = { day: 2, part: 1 }
    WednesdayMorning = { day: 3, part: 1 }
    ThursdayMorning = { day: 4, part: 1 }
    FridayMorning = { day: 5, part: 1 }
    MondayAfternoon = { day: 1, part: 2 }
    TuesdayAfternoon = { day: 2, part: 2 }
    WednesdayAfternoon = { day: 3, part: 2 }
    ThursdayAfternoon = { day: 4, part: 2 }
    FridayAfternoon = { day: 5, part: 2 }
}

/* model unit Staff */
concept Person {
    name: identifier;
    fullName: string;
    phone: number;
    availability: TimeStamp[];
    reference competence: Course[];
}

/* model unit CourseCategory */
concept Course {
    name: identifier;
    description: string;
}

/* model unit AllCourses */
concept Room {
    name: identifier;
    equipment: string;
}

```

## The Freon Native Editor

As a first step we will create a native Freon editor, but we are not going to spend much effort on it.
We will make the name and phone number information of a teacher into a fragment, put the list of 
competences of a teacher in a list of checkboxes, and clean up the rest a little bit.

```proto
// CourseSchedule/phase1/defs/main.edit

editor default

global {
    external {
        PersonIcon,
        PhoneButton,
        StaffAccordion,
        Schedule
    }
}

/* model unit Staff */
Staff {[
Staff in the category: ${self.name}

    ${self.teachers}
]}

Person {[
    [fragment name]
        Availability: ${self.availability checkbox} Competence: ${self.competence}
]
fragment name [
Nickname: ${self.name}
Full Name: ${self.fullName}
Phone number: ${self.phone}
]
}

/* model unit CourseCategory */
CourseCategory {[
Category: ${self.name}

    ${self.courses}
]}

/* model unit Schedule */
Schedule {[
Schedule ${self.name}

    ${self.timeSlots}
]}
Slot {[
${self.time}
    Teacher: ${self.teacher}
    Room:    ${self.room}
    Course:  ${self.course}
]}

```

The editor for the staff model unit now looks like this.

<Figure
imageName={'examples/CourseSchedule/Screenshot-step1.png'}
caption={'The native Freon editor'}
figureNumber={1}
/>
