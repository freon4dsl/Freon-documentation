---
title: The CourseSchedule Language
description: Define a simple DSL for scheduling adult training courses with teachers, rooms, and weekly time slots, and create a minimal native Freon editor to view and edit schedules.
tags: Freon, CourseSchedule, DSL, scheduling, teachers, rooms, TimeStamp, modelunit, editor, projections, checkbox, fragments
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The CourseSchedule Language

The **CourseSchedule** DSL focuses on scheduling adult training courses.  
Its core concepts are **courses**, **rooms**, and **teachers**, with a simplified notion of time:  
ten time slots per week—**Monday morning** through **Friday afternoon**.

Below is the metamodel, which by now should feel familiar.

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

As a first step we’ll create a **native Freon editor**—kept intentionally simple.  
We’ll extract a **fragment** for the teacher’s name and phone info, display a teacher’s **competences** as a **checkbox** list, and tidy up the rest.

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

The editor for the **Staff** model unit now looks like this:

<Figure
imageName={'examples/CourseSchedule/Screenshot-step1.png'}
caption={'The native Freon editor'}
figureNumber={1}
/>
