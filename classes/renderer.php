<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Provides thes {@link block_loancalc_renderer} class.
 *
 * @package     block_loancalc
 * @subpackage  plugintype_pluginname
 * @category    optional API reference
 * @copyright   2016 David Mudrák <david@moodle.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Output rendering class for the loan calculator block.
 *
 * @copyright 2016 David Mudrak <david@moodle.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class block_loancalc_renderer extends plugin_renderer_base {

    /**
     * Render the main content area of the block.
     *
     * @return string HTML
     */
    public function content_text() {
        return $this->render_from_template('block_loancalc/main', []);
    }

    /**
     * Render the footer area of the block.
     *
     * @return string HTML
     */
    public function content_footer() {
        return '';
    }
}
