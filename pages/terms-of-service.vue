<script setup lang="ts">
definePageMeta({
  title: 'Terms of Use · MoJ Todo Exercise',
})

const lastUpdated = '4 May 2026'
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-16 space-y-10">
    <BackLink />

    <header class="space-y-3">
      <h1 class="text-3xl font-semibold">
        Terms of Use
      </h1>

      <p class="text-sm text-gray-500">
        Last updated: {{ lastUpdated }}
      </p>
    </header>

    <section class="space-y-4 text-gray-700">
      <p>
        These terms explain how this MoJ Todo Exercise should be used. By using
        the application, you agree to use it responsibly and only for its intended
        purpose as a development exercise.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        1. About this application
      </h2>

      <p class="text-gray-700">
        The MoJ Todo Exercise is a simple web application for creating, viewing,
        editing and deleting todo items.
      </p>

      <p class="text-gray-700">
        It is intended as a technical exercise and should not be treated as a live
        Ministry of Justice production service.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        2. No authentication
      </h2>

      <p class="text-gray-700">
        This version of the application does not require users to create an account
        or sign in.
      </p>

      <p class="text-gray-700">
        Because the application is authless, todo items are shared application data.
        Anyone with access to the app may be able to view, update or delete todos.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        3. Test data only
      </h2>

      <p class="text-gray-700">
        You should only enter test data into this application.
      </p>

      <p class="text-gray-700">
        Do not enter real personal data, case information, confidential data,
        operational Ministry of Justice data, security information or anything
        sensitive.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        4. Acceptable use
      </h2>

      <p class="text-gray-700">
        You agree not to misuse the application, including attempting to:
      </p>

      <ul class="list-disc space-y-2 pl-6 text-gray-700">
        <li>interfere with the operation of the application</li>
        <li>submit malicious, harmful or unlawful content</li>
        <li>attempt to access systems or data without permission</li>
        <li>use the application to store real casework or confidential information</li>
        <li>deliberately delete or alter data in a way that disrupts the exercise</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        5. Availability
      </h2>

      <p class="text-gray-700">
        This application is provided for exercise and demonstration purposes. It may
        be changed, reset, unavailable or removed at any time.
      </p>

      <p class="text-gray-700">
        Todo data may also be cleared from the database without notice.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        6. No warranties
      </h2>

      <p class="text-gray-700">
        The application is provided as is. It may contain bugs, incomplete features
        or temporary behaviour while it is being developed.
      </p>

      <p class="text-gray-700">
        It should not be relied on for real task management, casework or operational
        decisions.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        7. Security
      </h2>

      <p class="text-gray-700">
        This exercise does not currently include full production security controls
        such as authentication, user-level permissions or audit logging.
      </p>

      <p class="text-gray-700">
        Before this application is used in a real environment, appropriate security,
        privacy and access controls should be added.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        8. Intellectual property
      </h2>

      <p class="text-gray-700">
        The application code, design and content are provided for the purposes of
        the exercise. They should not be reused, copied or distributed unless you
        have permission to do so.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        9. Changes to these terms
      </h2>

      <p class="text-gray-700">
        These terms may be updated as the exercise application changes. The last
        updated date above shows when this page was most recently changed.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">
        10. Contact
      </h2>

      <p class="text-gray-700">
        For this exercise, replace this contact address with the appropriate team,
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