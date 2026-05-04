<script setup lang="ts">
definePageMeta({
  title: 'Privacy Notice · MoJ Todo Exercise',
})

const lastUpdated = '4 May 2026'
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-16 space-y-10">
    <BackLink />

    <header class="space-y-3">
      <h1 class="text-3xl font-semibold">
        Privacy Notice
      </h1>

      <p class="text-sm text-gray-500">
        Last updated: {{ lastUpdated }}
      </p>
    </header>

    <section class="space-y-4 text-gray-700">
      <p>
        This privacy notice explains how data is handled in this MoJ Todo Exercise.
        This is a simple demonstration application for creating, viewing, updating and
        deleting todo items.
      </p>

      <p>
        The application does not require users to sign in and does not collect account,
        payment or subscription information.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        1. What this application does
      </h2>

      <p class="text-gray-700">
        The MoJ Todo Exercise lets users create todo items with a title, optional
        description, optional due date and task status.
      </p>

      <p class="text-gray-700">
        Because the application is currently authless, todo items are not linked to
        individual user accounts.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        2. What data is stored
      </h2>

      <p class="text-gray-700">
        The application stores the todo data entered into the form, including:
      </p>

      <ul class="list-disc space-y-2 pl-6 text-gray-700">
        <li>task title</li>
        <li>task description, if provided</li>
        <li>task status, such as to do, in progress or done</li>
        <li>due date and time, if provided</li>
        <li>created and updated timestamps</li>
      </ul>

      <p class="text-gray-700">
        Users should not enter sensitive personal information, case details, confidential
        information or real Ministry of Justice data into this exercise application.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        3. How the data is used
      </h2>

      <p class="text-gray-700">
        Todo data is used only to provide the core CRUD functionality of the exercise:
      </p>

      <ul class="list-disc space-y-2 pl-6 text-gray-700">
        <li>creating todo items</li>
        <li>displaying todo items</li>
        <li>editing todo items</li>
        <li>changing todo status</li>
        <li>deleting todo items</li>
        <li>showing dashboard summary counts</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        4. Authentication
      </h2>

      <p class="text-gray-700">
        This version of the application does not use authentication. Users do not need
        to create an account or sign in.
      </p>

      <p class="text-gray-700">
        As a result, todo items are shared application data rather than private user data.
        Anyone with access to the application may be able to view, update or delete todos.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        5. Cookies and local storage
      </h2>

      <p class="text-gray-700">
        This exercise does not require authentication cookies. It also does not need to
        store access tokens in the browser.
      </p>

      <p class="text-gray-700">
        If basic technical cookies or browser storage are introduced later, they should
        only be used where necessary to operate the application.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        6. Technical data
      </h2>

      <p class="text-gray-700">
        The application may generate standard technical information through hosting,
        server logs or error logs. This can include request times, error messages and
        basic operational information needed to run and debug the service.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        7. Data retention
      </h2>

      <p class="text-gray-700">
        Todo items remain stored until they are deleted through the application or removed
        from the database.
      </p>

      <p class="text-gray-700">
        Since this is an exercise application, test data may be cleared at any time.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        8. Deleting data
      </h2>

      <p class="text-gray-700">
        Todo items can be deleted from the tasks page using the delete action.
      </p>

      <p class="text-gray-700">
        Once a todo item is deleted, it should no longer appear in the task list or
        dashboard summary.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        9. Security
      </h2>

      <p class="text-gray-700">
        This application is intended as a development exercise. It should not be used to
        store real personal, confidential or operational data.
      </p>

      <p class="text-gray-700">
        Before using this application in a real environment, authentication, authorisation,
        validation, audit logging and appropriate data protection controls should be added.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        10. Contact
      </h2>

      <p class="text-gray-700">
        For this exercise, contact details should be replaced with the appropriate team,
        service owner or assessor contact if required.
      </p>

      <p class="text-gray-700">
        Example:
        <br />
        <a
          href="mailto:contact@example.com"
          class="font-medium text-gray-900 hover:underline"
        >
          contact@example.com
        </a>
      </p>
    </section>
  </main>
</template>