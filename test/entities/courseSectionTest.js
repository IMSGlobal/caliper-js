/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var moment = require('moment');
var test = require('tape');

var entityFactory = require('../../src/entities/entityFactory');
var CourseOffering = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');

var jsonCompare = require('../testUtils');

test('Create a CourseSection entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu/terms/201601/courses/7";

  var course = entityFactory().create(CourseOffering, BASE_IRI, { courseNumber: "CPS 435" });
  var section = entityFactory().create(CourseSection, BASE_IRI.concat("/sections/1"), {
    academicSession: "Fall 2016",
    courseNumber: "CPS 435-01",
    name: "CPS 435 Learning Analytics, Section 01",
    category: "seminar",
    subOrganizationOf: course,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityCourseSection', section, t);
});