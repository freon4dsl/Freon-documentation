<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Using External Svelte Components

The webpage of the Freon editor is based on <a href="https://svelte.dev/" target="_blank">Svelte</a> components. 
Freon has a number of native component available,
each of which is coupled to one of the box types in the [editor framework](/Documentation/Under_the_Hood/Editor_Framework).
You can change how these components look considerably by changing the [styling](/Documentation/Defining_an_Editor/Styling). 
However, sometimes you want the editor to have a completely different look. You can make this happen by adding your own 
Svelte components, either from a Library, or homemade. Please, also read the information 
on [customization using external components](/Documentation/Customizations/External_Components).

In this example we will show you how to add icons, and buttons, how to use an Accordion component from a library, and 
how to create a very specific table component. Because we already are using 
the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library from the complimentary web application, this 
is the library that we will use in this example. But of course you are free to make your own choices for the HTML library 
and the CSS styling tools.

The sources for this example are available from GitHub. When you have checked out the source code and are following this 
example in your own IDE, you might notice that upon regeneration the browser sometimes shows an empty page. The reason 
is that the browser is quicker than the regeneration process. (In the console of the browser development tools you will see
the message `Uncaught SyntaxError: Unexpected end of input (at bundle.js:54779:24)`.) Don't worry, simply reload 
the page, and everything will be fine.

[//]: # (todo correct link to GitHub page and which sources ar in which step)

## The Language Used

There can not be a Freon editor without a DSL, so first we must explain the language used in the example. Because our 
focus is not on the language but on the editor, we have kept the language small and simple. 

The DSL revolves about the
scheduling of training courses for adults. The main concepts are courses, rooms, and teachers, and there is a simplified
notion of time. There are 10 time slots in a week, from Monday morning to Friday afternoon. Teachers and rooms have an
availability. Rooms have equipment, like kitchen utensils for cooking courses, and teachers have competences, which means
they are capable of giving a certain training course.

The following is the metamodel, which by now you should be able to understand without problems.

```proto
// CourseSchedule/step1/main.ast

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
    time: TimeSlot;
    reference teacher: Person;
    reference room: Room;
    reference course: Course;
}

limited TimeSlot {
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
    availability: TimeSlot[];
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
// CourseSchedule/step1/main.edit

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
