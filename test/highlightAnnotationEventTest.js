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

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/annotationEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var AnnotationActions = require('../src/actions/annotationActions');

// Activity Context
var CourseSection = require('../src/entities/lis/courseSection');
var Frame = require('../src/entities/reading/frame');
var HighlightAnnotation = require('../src/entities/annotation/highlightAnnotation');
var EPubVolume = require('../src/entities/reading/ePubVolume');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');
var WebPage = require('../src/entities/reading/webPage');

test('Create HighlightAnnotation Event and validate attributes', function (t) {

    // Plan for N assertions
    t.plan(1);

    // The Actor for the Caliper Event
    var actor = new Person("https://some-university.edu/user/554433");
    actor.setRoles([Role.LEARNER]);
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Action for the Caliper Event
    var action = AnnotationActions.HIGHLIGHTED;

    // The DigitalResource parent
    var ePub = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
    ePub.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
    ePub.setVersion("2nd ed.");
    ePub.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    ePub.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Object being interacted with by the Actor
    var eventObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
    eventObj.setName("Key Figures: George Washington");
    eventObj.setIsPartOf(ePub);
    eventObj.setVersion(ePub.version);
    eventObj.setIndex(1);
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The generated annotation
    var generated = new HighlightAnnotation("https://someEduApp.edu/highlights/12345");
    generated.setAnnotated(eventObj['@id']);
    generated.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    generated.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    generated.setSelection({ "start": "455", "end": "489" });
    generated.setSelectionText("Life, Liberty and the pursuit of Happiness");

    // The edApp that is part of the Learning Context
    var edApp = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
    edApp.setName("Readium");
    edApp.setRoles([]);
    edApp.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    edApp.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Offering
    var courseOffering = new CourseOffering("https://some-university.edu/politicalScience/2015/american-revolution-101");
    courseOffering.setName("Political Science 101: The American Revolution");
    courseOffering.setCourseNumber("POL101");
    courseOffering.setAcademicSession("Fall-2015");
    courseOffering.setSubOrganizationOf(null);
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseSection.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Group
    var group = new Group("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    group.setName("Discussion Group 001");
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // Asser that key attributes are the same
    var hilightAnnotationEvent = new Event();
    hilightAnnotationEvent.setActor(actor);
    hilightAnnotationEvent.setAction(action);
    hilightAnnotationEvent.setObject(eventObj);
    hilightAnnotationEvent.setGenerated(generated);
    hilightAnnotationEvent.setEdApp(edApp);
    hilightAnnotationEvent.setGroup(group);
    hilightAnnotationEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    console.log("Highlight Annotation Event = " + util.inspect(hilightAnnotationEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperHighlightAnnotationEvent', hilightAnnotationEvent, t);
});